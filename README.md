# Welcome to glivera-bun-template

## Get started

1. Install node.js, bun for your OS. https://bun.sh/docs/installation

2. Reload VS Code and install npm packages
   `bun install`

3. Let's code!

- `bun run dev` - File watching + server
- `bun run build` - Build (production mode)
- `bun run staging` - Build + dev widget (production mode)

## Template structure

```
build                        # Production build
dev-dist                         # Dev build
public                       # Production WP build
helpers                      # All type samples and plugins
├── components               # Snippets & Vanilla js helpers
src                          # Sources
├── fonts                    # Fonts
│   ├── icons                # Iconfont
├── images                   # Images
│   ├── icons                # Icons
│   |   ├── sprite-icons     # Icons used in sprite
├── js                       # Scripts
├── pug                      # Layout
├── scss                     # Styles
```

## Rules:

KBEM styles for class names.
Kebab-case for all files - foo-bar-baz.ex
For pug mixins - m-foo-bar-baz.pug

#
