# Rendering Targets

Kryon supports multiple rendering targets from a single source. Each target has different capabilities and use cases.

## Target Overview

| Target | Output | Status | Use Case |
|--------|--------|--------|----------|
| **Web** | HTML/CSS/JS | Production | Websites, web apps |
| **Desktop** | SDL3/Raylib window | Production | Desktop apps, games |
| **Terminal** | TUI | Production | CLI tools, SSH |
| **Android** | APK | Partial | Mobile apps |
| **Framebuffer** | Direct pixels | Partial | Embedded, IoT |

---

## Web Target

Generates static HTML/CSS/JS for deployment to any web server.

### Usage

```bash
kryon build --target=web
kryon run                    # Starts dev server
```

### Output

```
dist/
├── index.html
├── kryon.css
├── kryon.js
└── assets/
```

### Features

- CSS flexbox layout
- JavaScript event handlers
- Responsive design
- Static file generation
- Dev server with auto-open

### Configuration

```toml
[web]
renderer = "static"
generate_separate_files = true
include_js_runtime = false
minify_css = true
minify_js = true
```

---

## Desktop Target (SDL3/Raylib)

Renders to native desktop window using hardware-accelerated graphics. Kryon supports two rendering backends for desktop applications.

### Rendering Backends

**SDL3** - Modern cross-platform renderer (default)
- Hardware-accelerated graphics via OpenGL/Vulkan/Metal
- TrueType font rendering
- Production-ready

**Raylib** - Alternative rendering backend
- 3D support built-in
- Simple API for games and visual applications
- Cross-platform compatibility

### Usage

```bash
# Runtime renderer selection (recommended)
kryon run app.kry --renderer=sdl3     # SDL3 rendering
kryon run app.kry --renderer=raylib   # Raylib rendering

# Or via environment variable
KRYON_RENDERER=raylib kryon run app.kry
```

### Features

- GPU acceleration
- TrueType font rendering
- Mouse and keyboard input
- Window management (resize, fullscreen)
- 60 FPS rendering
- Cross-platform (Linux, macOS, Windows)
- **Raylib:** 3D rendering, raycasting, game-focused features

### Dependencies

**SDL3:**
```bash
# Ubuntu/Debian
sudo apt install libsdl3-dev libsdl3-ttf-dev

# Fedora
sudo dnf install SDL3-devel SDL3_ttf-devel

# macOS
brew install sdl3 sdl3_ttf
```

**Raylib:**
```bash
# Ubuntu/Debian
sudo apt install libraylib-dev

# Fedora
sudo dnf install raylib-devel

# macOS
brew install raylib
```

### Configuration

```toml
[desktop]
renderer = "sdl3"            # or "raylib"

[window]
title = "My App"
width = 1200
height = 900
resizable = true
```

---

## Terminal Target

Renders to terminal using ANSI escape codes for TUI applications.

### Usage

```bash
kryon run --target=terminal
# or
KRYON_RENDERER=terminal kryon run app.kir
```

### Features

- Full terminal capability detection
- 16/256/24-bit color support
- Mouse and keyboard input
- Unicode with fallbacks
- Box drawing characters
- Works over SSH

### Dependencies

```bash
# Ubuntu/Debian
sudo apt install libtickit-dev libncurses-dev

# Build terminal renderer
cd kryon/renderers/terminal
make deps    # Auto-install
make
```

### Supported Terminals

- xterm, xterm-256color
- konsole, gnome-terminal
- iTerm2, Terminal.app
- Windows Terminal
- tmux, screen

---

## Android Target

Builds Android applications using OpenGL ES 3.0.

### Usage

```bash
kryon run --target=android
```

### Requirements

- Android NDK 26.1+
- Android SDK
- Gradle 8.2+
- Kotlin 1.9.20+
- API Level 24+ (Android 7.0+)

### Setup

```bash
# Set environment
export ANDROID_HOME=/path/to/android-sdk
export ANDROID_NDK_HOME=$ANDROID_HOME/ndk/26.1.10909125

# Build Android libraries
cd kryon/renderers/android
make ndk-build
```

### Features

- OpenGL ES 3.0 rendering
- Touch event handling
- Display density scaling
- Hot reload (experimental)
- Animation support

### Configuration

```toml
[android]
min_api_level = 24
target_abi = "arm64-v8a"
```

---

## Framebuffer Target

Direct framebuffer rendering for embedded systems.

### Usage

```bash
KRYON_RENDERER=framebuffer kryon run app.kir
```

### Features

- Direct pixel writes to `/dev/fb0`
- 8/16/32-bit color depth
- Double buffering
- No X11/Wayland required
- Minimal dependencies

### Use Cases

- Raspberry Pi
- Embedded Linux
- Kiosk displays
- Industrial HMI

### Requirements

- Linux with framebuffer support
- Write access to `/dev/fb0`

```bash
# Check framebuffer
cat /dev/fb0 > /dev/null && echo "Framebuffer available"
```

---

## Target Comparison

| Feature | Web | Desktop (SDL3) | Desktop (Raylib) | Terminal | Android | Framebuffer |
|---------|-----|----------------|------------------|----------|---------|-------------|
| GPU acceleration | Browser | Yes | Yes | No | Yes | No |
| Color depth | 24-bit | 32-bit | 32-bit | 24-bit | 32-bit | 8-32-bit |
| Font rendering | CSS | TTF | TTF | ASCII | TTF | Built-in |
| 3D support | WebGL | Via SDL3 | Yes | No | OpenGL ES | No |
| Animation | CSS/JS | 60 FPS | 60 FPS | Limited | 60 FPS | Manual |
| Input | DOM | SDL | Raylib | ANSI | Touch | Raw |
| Distribution | Web hosting | Binary | Binary | Binary | APK | Binary |
| Dependencies | None | SDL3 | Raylib | libtickit | NDK | None |

---

## Choosing a Target

**Web** - Best for:
- Public websites
- Cross-platform reach
- No installation required
- SEO-friendly content

**Desktop (SDL3)** - Best for:
- Native performance with hardware acceleration
- Desktop applications
- Offline applications
- Custom window management
- Production-ready renderer

**Desktop (Raylib)** - Best for:
- Games and visual applications
- 3D rendering requirements
- Simple, game-focused API
- Learning game development

**Terminal** - Best for:
- CLI tools
- Remote access (SSH)
- Minimal resources
- Scripting integration

**Android** - Best for:
- Mobile apps
- Touch interfaces
- Play Store distribution

**Framebuffer** - Best for:
- Embedded systems
- Kiosk displays
- IoT devices
- Resource-constrained environments
