import { proxy } from 'valtio';
import { Device } from '../models/Device';

/**
 * Create device state management
 */
export const deviceStore = proxy(
  new Device('SN-12345', 'Smart Device Pro')
);

// Export some convenience methods
export const initVersionInfo = (): void => {
  deviceStore.onVersionInfo();
};

export const updateDeviceStatus = (status: 'offline' | 'online'): void => {
  deviceStore.updateStatus(status);
};

export const getDeviceInfo = () => {
  return deviceStore.getDeviceInfo();
};

