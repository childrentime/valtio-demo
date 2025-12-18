import { ref } from 'valtio';
import { OtaVersion } from './OtaVersion';

interface DeviceInfo {
  id: string;
  modelName: string;
  status: string;
  otaVersion: ReturnType<OtaVersion['getVersionInfo']> | null;
}

/**
 * Device class - will be proxied by Valtio
 */
export class Device {
  id: string;
  originModelName: string;
  otaVersion: OtaVersion | null;
  status: 'offline' | 'online';

  constructor(id: string, modelName: string) {
    this.id = id;
    this.originModelName = modelName;
    this.otaVersion = null;
    this.status = 'offline';
  }

  /**
   * Initialize OTA version information
   * Use ref() to wrap OtaVersion instance to avoid being proxied by Valtio
   */
  onVersionInfo(): void {
    // Simulate OTA module data
    const otaModules = ['module-a', 'module-b', 'module-c'];

    // Use ref() to wrap so OtaVersion instance won't be proxied by Valtio
    this.otaVersion = ref(
      new OtaVersion({
        state: otaModules[0],
        sn: this.id,
        modelName: this.originModelName,
      })
    );


    this.status = 'online';
  }

  // Update device status
  updateStatus(newStatus: 'offline' | 'online'): void {
    this.status = newStatus;
  }

  // Get device information
  getDeviceInfo(): DeviceInfo {
    return {
      id: this.id,
      modelName: this.originModelName,
      status: this.status,
      otaVersion: this.otaVersion ? this.otaVersion.getVersionInfo() : null,
    };
  }
}

