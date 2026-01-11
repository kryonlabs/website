# Visual Testing with kryon-test

kryon-test is a visual regression testing framework for Kryon applications. It provides automated screenshot-based testing to verify that UI changes don't break existing applications.

## Overview

After making changes to the Kryon framework, you can run tests to verify existing apps still render correctly. kryon-test captures screenshots of your application and compares them against baseline images.

### Features

- **YAML-based configuration** - Define tests in simple YAML files
- **Screenshot comparison** - Pixel-accurate visual regression testing
- **Wireframe mode** - Test reactive components without exact pixel matching
- **CLI interface** - For CI/CD automation
- **Visual GUI** - Raylib-based test runner for interactive verification
- **Multi-renderer support** - Test with SDL3, Raylib, or Terminal backends

## Installation

### Using Nix (Recommended)

```bash
cd kryon-test
nix-shell
```

This provides all dependencies including:
- Raylib (GUI)
- libyaml (config parsing)
- stb_image (image loading/saving)
- SDL3 (for running Kryon apps)

### Manual Installation

Install dependencies:
- `gcc` or `clang`
- `raylib`
- `libyaml`
- `pkg-config`

## Building

```bash
cd kryon-test
make
```

This builds two binaries:
- `build/kryon-test-gui` - Visual test runner
- `build/kryon-test` - Command-line interface

## Quick Start

### 1. Create a Test Configuration

Create a YAML file for your app (see `configs/habits.yaml` for example):

```yaml
test_name: "My App Tests"

app:
  path: "/path/to/your/app"
  entry: "main.lua"
  frontend: "lua"
  renderer: "sdl3"
  window:
    width: 800
    height: 600

tests:
  - name: "main_view"
    description: "Main screen"
    screenshot_delay_ms: 500
    capture_mode: "normal"
    baseline: "baselines/myapp/main_view.png"
```

### 2. Generate Baselines

First, create baseline screenshots:

```bash
./build/kryon-test baseline configs/myapp.yaml
```

### 3. Run Tests

Run tests to compare against baselines:

```bash
./build/kryon-test run configs/myapp.yaml
```

### 4. View Results (Optional)

Use the GUI for visual comparison:

```bash
./build/kryon-test-gui configs/myapp.yaml
```

## Configuration Reference

### Test Config Schema

```yaml
test_name: "Test Suite Name"  # Required

app:
  path: "/absolute/path/to/app"    # Required
  entry: "main.lua"                 # Required
  frontend: "lua"                   # Optional: lua, nim, ts
  renderer: "sdl3"                  # Optional: sdl3, raylib, terminal
  window:
    width: 800                      # Window width for screenshot
    height: 600                     # Window height for screenshot

tests:
  - name: "test_name"               # Required
    description: "Test description" # Optional
    screenshot_delay_ms: 500        # Delay before capture (ms)
    capture_mode: "normal"          # normal or wireframe
    baseline: "baselines/..."       # Path to baseline image
    wireframe:
      show_for_each: true           # Highlight ForEach containers
      show_reactive: true           # Highlight reactive state
      color: "#FF0000"              # Wireframe color

output:
  actual_dir: "output/actual"       # Where to save actual screenshots
  diff_dir: "output/diff"           # Where to save diff images
  failure_threshold: 0.01           # Max allowed pixel difference (0-1)
```

### Capture Modes

- **normal** - Full pixel-perfect comparison
- **wireframe** - Shows reactive component boundaries (for testing structure)

## Wireframe Mode

Wireframe mode renders a visual outline of reactive components instead of full rendering. This is useful for:

- Testing dynamic content (e.g., calendar dates that change)
- Verifying component structure without pixel-perfect matching
- Testing reactive state containers

Wireframe rendering is controlled by the Kryon framework's test mode:
- `KRYON_WIREFRAME=1` - Enable wireframe rendering
- `KRYON_WIREFRAME_COLOR=#RRGGBB` - Set wireframe color

## CLI Commands

### `run <config.yaml> [renderer]`

Run all tests in the config file.

```bash
# Run tests with default renderer
./build/kryon-test run configs/habits.yaml

# Run tests with specific renderer
./build/kryon-test run configs/habits.yaml sdl3
./build/kryon-test run configs/habits.yaml raylib
```

Exit codes:
- `0` - All tests passed
- `1` - One or more tests failed

### `baseline <config.yaml> [renderer]`

Generate baseline screenshots for tests that don't have one.

```bash
# Generate baselines with default renderer
./build/kryon-test baseline configs/habits.yaml

# Generate baselines with specific renderer
./build/kryon-test baseline configs/habits.yaml raylib
```

### `validate <config.yaml>`

Validate the configuration file without running tests.

```bash
./build/kryon-test validate configs/habits.yaml
```

### `list`

List all available test configurations.

```bash
./build/kryon-test list
```

## GUI Usage

Launch the visual test runner:

```bash
./build/kryon-test-gui [config.yaml]
```

**Controls:**
- Click a test to run it
- View side-by-side comparison (baseline vs actual)
- Click "Accept" to save the actual screenshot as the new baseline
- Click "Save" to save the actual screenshot to the output directory

### GUI Features

The GUI test runner provides:
1. **Test List** - See all tests and their status
2. **Side-by-Side Comparison** - View baseline and actual images together
3. **Diff View** - Highlight differences in red
4. **Interactive Updates** - Accept new baselines with one click

## Output Files

After running tests, you'll find:

- `output/<app>/actual/` - Captured screenshots
- `output/<app>/diff/` - Difference images (red = differing pixels)

## Integration with Kryon

kryon-test uses Kryon's built-in screenshot capabilities:

- `KRYON_SCREENSHOT=<path>` - Save screenshot to path
- `KRYON_SCREENSHOT_AFTER_FRAMES=N` - Capture after N frames
- `KRYON_HEADLESS=1` - Exit after screenshot (for automation)

## Multi-Renderer Testing

Test your application across different rendering backends:

```yaml
# In your test config, specify multiple renderers
renderers:
  - sdl3
  - raylib

# Or test separately
./build/kryon-test run configs/app.yaml sdl3
./build/kryon-test run configs/app.yaml raylib
```

## Example: Habits App

The `configs/habits.yaml` file demonstrates testing the Habits Tracker app:

```bash
# Generate baselines first
./build/kryon-test baseline configs/habits.yaml

# Run tests
./build/kryon-test run configs/habits.yaml

# Or use the GUI
./build/kryon-test-gui configs/habits.yaml
```

## Troubleshooting

### "Failed to capture screenshot"

- Check the app path is correct
- Verify `kryon` is in your PATH
- Ensure the Kryon app runs without errors

### "Config file not found"

- Use absolute paths in config files
- Check YAML syntax is valid

### "Dimension mismatch"

- Baseline was captured at different resolution
- Delete baseline and regenerate: `./build/kryon-test baseline <config>`

### "Too many pixel differences"

- Adjust `failure_threshold` in config
- Consider using wireframe mode for dynamic content

## CI/CD Integration

For automated testing in CI/CD:

```yaml
# Example GitHub Actions
- name: Run visual tests
  run: |
    cd kryon-test
    make
    ./build/kryon-test run configs/habits.yaml
  env:
    KRYON_HEADLESS: 1  # Exit after screenshot
```

## See Also

- [CLI Reference](/docs/cli-reference) - Main Kryon CLI documentation
- [Targets](/docs/targets) - Rendering backend documentation
