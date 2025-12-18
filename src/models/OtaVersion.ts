/**
 * OTA version information class
 */

interface OtaVersionConfig {
  state: string;
  sn: string;
  modelName: string;
}

interface VersionInfo {
  state: string;
  sn: string;
  modelName: string;
  version: string;
  updateTime: string;
}

export class OtaVersion {
  state: string;
  sn: string;
  modelName: string;
  version: string;
  updateTime: string;

  constructor({ state, sn, modelName }: OtaVersionConfig) {
    this.state = state;
    this.sn = sn;
    this.modelName = modelName;
    this.version = '1.0.0';
    this.updateTime = new Date().toISOString();
  }

  // Get version information
  getVersionInfo(): VersionInfo {
    return {
      state: this.state,
      sn: this.sn,
      modelName: this.modelName,
      version: this.version,
      updateTime: this.updateTime
    };
  }

  // Update version
  updateVersion(newVersion: string): void {
    this.version = newVersion;
    this.updateTime = new Date().toISOString();
  }
}

