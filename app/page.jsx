export default function Home() {
  return (
    <>
      <div className="toolbar">
        <div className="h1">Overview</div>
        <div className="actions">
          <a className="btn" href="/invoices">Go to Invoices</a>
        </div>
      </div>

      <div className="grid cols-3">
        <div className="panel pad">
          <div className="h2">Active Customers</div>
          <div style={{ fontSize:34, marginTop:6 }}>59</div>
          <span className="chip info">+3 this week</span>
        </div>
        <div className="panel pad">
          <div className="h2">Open Invoices</div>
          <div style={{ fontSize:34, marginTop:6 }}>12</div>
          <span className="chip warn">3 overdue</span>
        </div>
        <div className="panel pad">
          <div className="h2">Collections</div>
          <div style={{ fontSize:34, marginTop:6 }}>$48,300</div>
          <span className="chip success">This month</span>
        </div>
      </div>
    </>
  );
}
