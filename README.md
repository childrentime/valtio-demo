# Valtio Demo - Device Management

这是一个使用 Vite + React + TypeScript + Valtio 2.1.2 构建的前端演示项目。

## 功能特点

- ✅ 使用 TypeScript 实现类型安全
- ✅ 使用 Valtio proxy 代理 Device 类
- ✅ Device 类包含 `onVersionInfo` 方法
- ✅ 使用 `ref()` 包裹 OtaVersion 实例，避免被 Valtio 代理
- ✅ 使用 `useSnapshot` 实现响应式状态更新
- ✅ 完整的设备状态管理示例
- ✅ 使用 `unstable_getInternalStates` 查看 Valtio 内部状态

## 技术栈

- **Vite**: 快速的前端构建工具
- **React**: UI 框架
- **TypeScript**: 类型安全的 JavaScript 超集
- **Valtio 2.1.2**: 轻量级状态管理库

## 项目结构

```
src/
├── models/
│   ├── Device.ts        # 设备类（被 Valtio 代理）
│   └── OtaVersion.ts    # OTA 版本信息类
├── store/
│   └── deviceStore.ts   # Valtio 状态管理
├── App.tsx              # 主应用组件
├── App.css              # 样式文件
└── main.tsx             # 入口文件
```

## 核心实现

### Device 类

Device 类被 Valtio 的 `proxy` 代理，实现了响应式状态管理：

```typescript
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

  onVersionInfo(): void {
    const otaModules = ['module-a', 'module-b', 'module-c'];
    
    // 使用 ref() 包裹，避免 OtaVersion 被 Valtio 代理
    this.otaVersion = ref(
      new OtaVersion({
        state: otaModules[0],
        sn: this.id,
        modelName: this.originModelName,
      })
    );
    
    this.status = 'online';
  }
}
```

### Valtio 状态管理

```typescript
import { proxy } from 'valtio';
import { Device } from '../models/Device';

export const deviceStore = proxy(
  new Device('SN-12345', 'Smart Device Pro')
);
```

### React 组件使用

```typescript
import { useSnapshot } from 'valtio';
import { unstable_getInternalStates } from 'valtio';
import { deviceStore } from './store/deviceStore';

function App() {
  const snap = useSnapshot(deviceStore);
  
  return (
    <div>
      <p>设备ID: {snap.id}</p>
      <p>状态: {snap.status}</p>
      {snap.otaVersion && (
        <p>版本: {snap.otaVersion.version}</p>
      )}
      <button onClick={() => {
        console.log('test');
        const stats = unstable_getInternalStates();
        console.log(stats);
      }}>
        test
      </button>
    </div>
  );
}
```

## 安装和运行

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

然后在浏览器中打开 `http://localhost:5173`

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 使用说明

1. **初始化版本信息**: 点击"初始化版本信息"按钮，调用 `onVersionInfo` 方法
2. **更新设备状态**: 可以将设备状态设为在线或离线
3. **更新版本**: 初始化后，可以点击"更新版本"按钮来更新 OTA 版本

## Valtio 的 ref() 说明

`ref()` 函数用于标记对象，使其不被 Valtio 代理。在这个项目中：

- **Device 类**被 Valtio 代理，所有属性变化都会触发 React 组件更新
- **OtaVersion 实例**使用 `ref()` 包裹，保持其原始状态，不被代理

这样可以避免不必要的深层代理，提高性能，同时保持必要的响应式特性。

## License

MIT
