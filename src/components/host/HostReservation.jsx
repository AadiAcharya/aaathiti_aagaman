<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reservations</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background-color: #f5f5f5;
            padding: 40px 20px;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
            background-color: white;
            border-radius: 12px;
            padding: 32px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        h1 {
            font-size: 28px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 24px;
        }

        .tabs {
            display: flex;
            gap: 24px;
            border-bottom: 2px solid #e5e5e5;
            margin-bottom: 32px;
        }

        .tab {
            padding: 12px 0;
            font-size: 15px;
            font-weight: 500;
            color: #666;
            background: none;
            border: none;
            cursor: pointer;
            position: relative;
            transition: color 0.2s;
        }

        .tab:hover {
            color: #1a1a1a;
        }

        .tab.active {
            color: #1a1a1a;
        }

        .tab.active::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            right: 0;
            height: 2px;
            background-color: #1a1a1a;
        }

        .reservations-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .reservation-card {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 16px;
            border: 1px solid #e5e5e5;
            border-radius: 8px;
            transition: box-shadow 0.2s;
        }

        .reservation-card:hover {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .property-image {
            width: 80px;
            height: 80px;
            background-color: #999;
            border-radius: 6px;
            flex-shrink: 0;
        }

        .reservation-details {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .property-title {
            font-size: 16px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 4px;
        }

        .reservation-meta {
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
        }

        .meta-item {
            font-size: 14px;
            color: #666;
        }

        .meta-label {
            font-weight: 500;
        }

        .guest-name {
            font-size: 14px;
            color: #666;
        }

        .actions {
            display: flex;
            gap: 12px;
            flex-shrink: 0;
        }

        .btn {
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
        }

        .btn-approve {
            background-color: #666;
            color: white;
        }

        .btn-approve:hover {
            background-color: #4a4a4a;
        }

        .btn-reject {
            background-color: transparent;
            color: #666;
            border: 1px solid #e5e5e5;
        }

        .btn-reject:hover {
            background-color: #f5f5f5;
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #999;
        }

        @media (max-width: 640px) {
            .reservation-card {
                flex-direction: column;
                align-items: flex-start;
            }

            .actions {
                width: 100%;
                justify-content: flex-end;
            }

            .tabs {
                gap: 16px;
            }

            .tab {
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Reservations</h1>
        
        <div class="tabs">
            <button class="tab active" data-tab="upcoming">Upcoming</button>
            <button class="tab" data-tab="past">Past</button>
            <button class="tab" data-tab="rejected">Rejected</button>
        </div>

        <div id="upcoming" class="tab-content active">
            <div class="reservations-list">
                <div class="reservation-card">
                    <div class="property-image"></div>
                    <div class="reservation-details">
                        <div class="property-title">Fully Furnished Apartment</div>
                        <div class="reservation-meta">
                            <div class="meta-item">
                                <span class="meta-label">Check In:</span> Fri 21 Nov 2025
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Duration:</span> Long (2 - 5 Years)
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Guests:</span> 2 Adults
                            </div>
                        </div>
                        <div class="guest-name">By: John Doe</div>
                    </div>
                    <div class="actions">
                        <button class="btn btn-approve">Approve</button>
                        <button class="btn btn-reject">Reject</button>
                    </div>
                </div>

                <div class="reservation-card">
                    <div class="property-image"></div>
                    <div class="reservation-details">
                        <div class="property-title">Double Flat with 3 Rooms</div>
                        <div class="reservation-meta">
                            <div class="meta-item">
                                <span class="meta-label">Check In:</span> Fri 21 Nov 2025
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Duration:</span> Long (2 - 5 Years)
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Guests:</span> 2 Adults
                            </div>
                        </div>
                        <div class="guest-name">By: Harry Potter</div>
                    </div>
                    <div class="actions">
                        <button class="btn btn-approve">Approve</button>
                        <button class="btn btn-reject">Reject</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="past" class="tab-content">
            <div class="empty-state">
                <p>No past reservations</p>
            </div>
        </div>

        <div id="rejected" class="tab-content">
            <div class="empty-state">
                <p>No rejected reservations</p>
            </div>
        </div>
    </div>

    <script>
        // Tab switching functionality
        const tabs = document.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                
                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });

        // Button functionality
        document.querySelectorAll('.btn-approve').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.reservation-card');
                const title = card.querySelector('.property-title').textContent;
                alert(`Approved: ${title}`);
            });
        });

        document.querySelectorAll('.btn-reject').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.reservation-card');
                const title = card.querySelector('.property-title').textContent;
                if (confirm(`Are you sure you want to reject "${title}"?`)) {
                    alert(`Rejected: ${title}`);
                }
            });
        });
    </script>
</body>
</html>