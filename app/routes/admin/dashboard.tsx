import { Header } from "components";
import React from "react";

const Dashboard = () => {
  const user = {
    name: "Miles"
  }
  return (
    <main className="dashboard wrapper">
      <Header 
      title={`Welcome ${user?.name ?? 'Guest'} 👋`}
      description="Track activity, trends and popular destinations in real time"
      />
      Dashboard Page
    </main>
  );
};

export default Dashboard;
