// client/src/App.tsx
import React from "react";
import { Router, Switch, Route } from "wouter";
import Storefront from "./pages/Storefront";
import NotFound from "./pages/NotFound"; // FIXED (correct filename case)

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-base">
        <Switch>
          {/* Storefront and all sub-routes */}
          <Route path="/storefront/:rest*" component={Storefront} />
          <Route path="/storefront" component={Storefront} />
          <Route path="/:rest*" component={Storefront} />
          <Route path="/" component={Storefront} />

          {/* Fallback */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}
