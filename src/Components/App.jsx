import React from "react";

import Chat from "./Chat";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" component={Chat} />
    </Router>
  );
}

export default App;
