import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/subscribe">Subscribe</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/subscribe">
            <Subscribe />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Subscribe() {
  return <h2>Subscribe</h2>;
}

function Admin() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Admin</h2>

      <ul>
        <li>
          <Link to={`${match.url}/subscriptions`}>Subscriptions</Link>
        </li>
        <li>
          <Link to={`${match.url}/publish`}>
            Publish
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}