# Asset Export Instructions

Download each file from its Figma MCP URL (valid for 7 days from generation) and save to the path shown.

| Save to | Figma MCP URL |
|---|---|
| `src/assets/images/curebay-logo.png` | https://www.figma.com/api/mcp/asset/5d288793-c873-4da8-96e9-fb339b599a89 |
| `src/assets/icons/icon-offer.png` | https://www.figma.com/api/mcp/asset/d91b3c7b-99a5-469a-955b-ae15497dffa2 |
| `src/assets/icons/icon-bell.png` | https://www.figma.com/api/mcp/asset/8e069472-904c-4a6f-b4f3-9e5b22fac54b |
| `src/assets/icons/icon-cart.png` | https://www.figma.com/api/mcp/asset/39914ac6-1e66-435e-90f4-693070df5832 |
| `src/assets/icons/icon-profile.png` | https://www.figma.com/api/mcp/asset/10a516c5-1bb8-48f6-b72b-8114fedb79b1 |

## Quick download (PowerShell)

```powershell
$assets = @(
  @{ url = "https://www.figma.com/api/mcp/asset/5d288793-c873-4da8-96e9-fb339b599a89"; out = "src/assets/images/curebay-logo.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/d91b3c7b-99a5-469a-955b-ae15497dffa2"; out = "src/assets/icons/icon-offer.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/8e069472-904c-4a6f-b4f3-9e5b22fac54b"; out = "src/assets/icons/icon-bell.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/39914ac6-1e66-435e-90f4-693070df5832"; out = "src/assets/icons/icon-cart.png" },
  @{ url = "https://www.figma.com/api/mcp/asset/10a516c5-1bb8-48f6-b72b-8114fedb79b1"; out = "src/assets/icons/icon-profile.png" }
)
foreach ($a in $assets) { Invoke-WebRequest -Uri $a.url -OutFile $a.out }
```

## Quick download (bash / macOS / Linux)

```bash
curl -o src/assets/images/curebay-logo.png   "https://www.figma.com/api/mcp/asset/5d288793-c873-4da8-96e9-fb339b599a89"
curl -o src/assets/icons/icon-offer.png      "https://www.figma.com/api/mcp/asset/d91b3c7b-99a5-469a-955b-ae15497dffa2"
curl -o src/assets/icons/icon-bell.png       "https://www.figma.com/api/mcp/asset/8e069472-904c-4a6f-b4f3-9e5b22fac54b"
curl -o src/assets/icons/icon-cart.png       "https://www.figma.com/api/mcp/asset/39914ac6-1e66-435e-90f4-693070df5832"
curl -o src/assets/icons/icon-profile.png    "https://www.figma.com/api/mcp/asset/10a516c5-1bb8-48f6-b72b-8114fedb79b1"
```

## Production recommendation

For production, export assets directly from Figma as SVG (icons) and PNG 2x (logo) using
**Figma > Right-click layer > Export**. SVG icons scale perfectly and add no raster artifacts.
