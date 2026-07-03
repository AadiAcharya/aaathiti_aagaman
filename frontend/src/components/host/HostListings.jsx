import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hostAPI, roomsAPI } from "../../services/api";
import StarRating from "../common/StarRating";
import TopRatedBadge from "../common/TopRatedBadge";
import { isTopRated } from "../../utils/rating";
import Table from "../ui/Table";
import Badge from "../ui/Badge";
import IconButton from "../ui/IconButton";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";
import EmptyState from "../ui/EmptyState";
import { useToast } from "../ui/useToast";
import { Eye, Trash2, Building2, Plus } from "lucide-react";

export default function HostListings() {
  const navigate = useNavigate();
  const toast = useToast();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggling, setToggling] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const { listings: data } = await hostAPI.getListings();
        setListings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const handleToggleStatus = async (room) => {
    try {
      setToggling(room._id);
      await roomsAPI.update(room._id, { isAvailable: !room.isAvailable });
      setListings((prev) =>
        prev.map((l) =>
          l._id === room._id
            ? { ...l, isAvailable: !l.isAvailable, status: !l.isAvailable ? "Active" : "Inactive" }
            : l,
        ),
      );
    } catch (err) {
      toast(err.message, { type: "error" });
    } finally {
      setToggling(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await roomsAPI.delete(deleteTarget._id);
      setListings((prev) => prev.filter((l) => l._id !== deleteTarget._id));
      toast("Listing deleted", { type: "success" });
    } catch (err) {
      toast(err.message, { type: "error" });
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const columns = [
    {
      key: "title",
      label: "Property",
      render: (l) => (
        <div className="flex items-center gap-3">
          {l.image ? (
            <img src={l.image} alt="" className="w-11 h-11 rounded-[var(--radius-control)] object-cover shrink-0" />
          ) : (
            <div className="w-11 h-11 rounded-[var(--radius-control)] bg-bg-secondary flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4 text-text-muted" />
            </div>
          )}
          <span className="font-medium text-text-primary">{l.title}</span>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (l) => <span className="capitalize text-text-secondary">{l.type}</span>,
    },
    {
      key: "isAvailable",
      label: "Status",
      render: (l) => (
        <button onClick={() => handleToggleStatus(l)} disabled={toggling === l._id}>
          <Badge tone={l.isAvailable ? "success" : "default"}>
            {l.isAvailable ? "Active" : "Inactive"}
          </Badge>
        </button>
      ),
    },
    {
      key: "priceDisplay",
      label: "Price",
      render: (l) => <span className="font-semibold text-text-primary">{l.priceDisplay}</span>,
    },
    {
      key: "rating",
      label: "Rating",
      render: (l) =>
        l.reviews > 0 ? (
          <div className="flex flex-col gap-1">
            <StarRating rating={l.rating} reviews={l.reviews} showValue size="w-3.5 h-3.5" />
            {isTopRated(l.rating, l.reviews) && <TopRatedBadge />}
          </div>
        ) : (
          <span className="text-sm text-text-muted">No reviews yet</span>
        ),
    },
    {
      key: "bookingsCount",
      label: "Bookings",
      render: (l) => <span className="text-text-secondary">{l.bookingsCount}</span>,
    },
    {
      key: "actions",
      label: "",
      sortable: false,
      render: (l) => (
        <div className="flex items-center gap-1 justify-end">
          <IconButton icon={Eye} label="View listing" size="sm" onClick={() => navigate(`/room/${l._id}`)} />
          <IconButton
            icon={Trash2}
            label="Delete listing"
            size="sm"
            variant="danger"
            onClick={() => setDeleteTarget(l)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">Listings</h1>
          <p className="text-text-secondary text-sm mt-1">Manage your properties</p>
        </div>
        <Button icon={Plus} onClick={() => navigate("/add-property")}>
          Add Property
        </Button>
      </div>

      {error && (
        <div className="rounded-[var(--radius-control)] bg-danger-subtle border border-danger/30 text-danger px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <Table
        columns={columns}
        data={listings}
        loading={loading}
        sortable
        emptyState={
          <EmptyState
            icon={Building2}
            title="No listings yet"
            description="Add your first property to start hosting."
            action={
              <Button size="sm" icon={Plus} onClick={() => navigate("/add-property")}>
                Add Property
              </Button>
            }
          />
        }
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this listing?"
        description={`"${deleteTarget?.title}" will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete"
        danger
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
