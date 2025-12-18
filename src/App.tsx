import { unstable_getInternalStates, useSnapshot } from "valtio";
import {
  deviceStore,
  initVersionInfo,
} from "./store/deviceStore";
import "./App.css";
import { useEffect } from "react";

function App() {
  // Use useSnapshot to subscribe to state changes
  const snap = useSnapshot(deviceStore);

  return (
    <div className="App">
      <h1>Valtio Demo - Device Management</h1>

      <div className="card">
        <h2>Device Information</h2>
        <div className="info-section">
          <p>
            <strong>Device ID:</strong> {snap.id}
          </p>
          <p>
            <strong>Model:</strong> {snap.originModelName}
          </p>
          <p>
            <strong>Status:</strong>
            <span className={`status ${snap.status}`}>{snap.status}</span>
          </p>
        </div>

        <div className="button-group">
          <button onClick={() => {
            initVersionInfo();
          }}>
            initVersionInfo
          </button>
          <button
            onClick={() => {
              console.log("test");
              const stats = unstable_getInternalStates();
              console.log(stats);
            }}
          >
            test
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
