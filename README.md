# Tampermonkey Scripts

Userscripts for [Tampermonkey](https://www.tampermonkey.net/).

## Installation

1. Install the Tampermonkey browser extension.
2. Click **Install / update** next to a script below. Tampermonkey opens its install dialog.

Installed scripts update themselves: Tampermonkey checks for a new version periodically. To update right away, click the link again or use *Tampermonkey > Dashboard > Check for userscript updates*.

## Scripts

<!-- scripts:start -->

### funke

| Script | Description | Version | |
|---|---|---|---|
| Cleverpush | UI Verbesserungen für Cleverpush | 1 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/cleverpush/main.user.js) |
| CUE | UI Verbesserungen für CUE | 1 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/cue/main.user.js) |
| dpa Shop | UI Verbesserungen für dpa Shop | 1 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/dpa-shop/main.user.js) |
| Funke Abwesenheitsmeldung | UI Verbesserungen für Funke Abwesenheitsmeldung | 1 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/abwesenheitsmeldung/main.user.js) |
| Funke Intranet | UI Verbesserungen für Funke Intranet | 1 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/intranet/main.user.js) |
| Funke Portale | Printout Debug-Info for Funke News | 6 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/tz-portale/main.user.js) |
| Helpdesk UI | Helpdesk UI | 9 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/helpdesk/main.user.js) |
| JIRA Cloud | UI Verbesserungen für JIRA Cloud | 1 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/jira-cloud/main.user.js) |
| Microsoft Teams | UI Verbesserungen für Microsoft Teams | 1 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/teams/main.user.js) |
| SAP | Funke Self-Service | 1 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/sap/main.user.js) |
| SPARK Backend | UI Verbesserungen für SPARK Backend | 1 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/spark-backend/main.user.js) |
| VG-Wort Metis | VG-Wort Metis | 1 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/vg-wort-metis/main.user.js) |

### hartmut

| Script | Description | Version | |
|---|---|---|---|
| amazon | UI Verbesserungen für amazon | 1 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/hartmut/amazon/main.user.js) |
| Barmenia | UI Verbesserungen für meine barmenia Portal | 1 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/hartmut/barmenia/main.user.js) |
| Beliebige Seiten | UI Verbesserungen für beliebige Seiten | 2 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/hartmut/any/main.user.js) |
| github | UI Verbesserungen für github | 1 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/hartmut/github/main.user.js) |
| Kinoprogramm | UI Verbesserungen für Kinoprogramm in Berlin | 2 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/hartmut/berlin-kino/main.user.js) |
| Microsoft Dokumentation | UI Verbesserungen für Microsoft Dokumentation | 1 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/hartmut/ms-docs/main.user.js) |
| Perchance | UI Verbesserungen für Perchance | 2 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/hartmut/perchance/main.user.js) |
| Postbank | UI Verbesserungen für Postbank | 1 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/hartmut/postbank/main.user.js) |
| Quanta Magazine | UI Verbesserungen für Quanta Magazine | 1 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/hartmut/quanta-magazine/main.user.js) |
| stackoverflow | UI Verbesserungen für stackoverflow.com | 1 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/hartmut/stackoverflow/main.user.js) |
| www.bahn.de | bahn.de UI improvements | 1 | [Install / update](https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/hartmut/bahn.de/main.user.js) |

<!-- scripts:end -->

## Development

The script headers load their files either from GitHub or from the local dev server (`npm start`, http://localhost:3000/).

| Command | Effect |
|---|---|
| `npm run use-local` | Point all headers at localhost:3000 for development |
| `npm run use-github` | Point all headers back at GitHub (required before pushing) |
| `npm run readme` | Regenerate the script list above from the script headers |
| `npm run hooks` | Activate the git hooks in `.githooks/` (once per clone) |

Git hooks:
- `pre-commit` increases `@version` in `main.user.js` when a file in that script's folder is staged, and in all scripts when a file in `src/common/` is. A version you changed yourself is left alone. Afterwards the script list above is regenerated and staged.
- `pre-push` refuses to push commits whose scripts still reference localhost.

Notes:
- Tampermonkey only installs an update when `@version` increases. The `pre-commit` hook takes care of that.
- GitHub caches raw files for about 5 minutes.
- A new script goes in `src/<group>/<name>/main.user.js`. Copy `src/template/` as a starting point.
