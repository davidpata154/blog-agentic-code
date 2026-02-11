# ADW Quick Start Guide

## 🚀 Inicio Rápido

Esta guía te ayudará a configurar y usar el sistema ADW (AI Developer Workflow) en 5 minutos.

## ✅ Pre-requisitos

Verifica que tengas instalado:

```bash
# GitHub CLI
gh --version

# Python UV
uv --version

# Claude Code
claude --version

# Git
git --version
```

Si falta alguno, instálalo:

```bash
# macOS
brew install gh
curl -LsSf https://astral.sh/uv/install.sh | sh

# Autenticar GitHub
gh auth login
```

## ⚙️ Configuración (Primera Vez)

### 1. Configurar Variables de Entorno

```bash
# Copia el archivo de ejemplo
cp .env.sample .env

# Edita el archivo y agrega tu API key
# MÍNIMO REQUERIDO:
# ANTHROPIC_API_KEY=sk-ant-xxxxx
```

Abre `.env` en tu editor y configura al menos:

```bash
# REQUERIDO
ANTHROPIC_API_KEY=sk-ant-xxxxx

# OPCIONAL (recomendado)
GITHUB_PAT=ghp_xxxxx          # Si quieres usar cuenta diferente
CLAUDE_CODE_PATH=claude       # Ruta a claude (por defecto: claude)
```

### 2. Verificar Configuración

```bash
# Verifica que gh esté autenticado
gh auth status

# Verifica que tu .env tenga la API key
grep ANTHROPIC_API_KEY .env
```

## 🎯 Tu Primer Workflow

### Opción 1: Workflow Completo (Recomendado)

1. **Crea un issue en GitHub** describiendo lo que quieres:
   ```
   Title: Agregar página de contacto
   Body: Crear una página /contact con un formulario simple
   ```

2. **Ejecuta el workflow SDLC**:
   ```bash
   cd adws/
   uv run adw_sdlc_iso.py 123  # Reemplaza 123 con tu issue number
   ```

3. **Espera a que termine** (puede tomar 10-15 minutos)
   - El agente planificará la implementación
   - Implementará el código
   - Ejecutará pruebas
   - Revisará con screenshots
   - Generará documentación
   - Creará un PR

4. **Revisa el PR en GitHub** y haz merge cuando estés listo

### Opción 2: Workflow Rápido (Solo Plan + Build)

Si solo quieres una implementación rápida sin pruebas ni review:

```bash
cd adws/
uv run adw_plan_build_iso.py 123
```

Esto solo planifica e implementa, sin testing ni review.

## 📋 Workflows Disponibles

### Workflows Básicos (Crean un worktree aislado)

```bash
# Solo planificar
uv run adw_plan_iso.py <issue-number>

# Plan + Implementar
uv run adw_plan_build_iso.py <issue-number>

# Plan + Build + Test
uv run adw_plan_build_test_iso.py <issue-number>

# SDLC Completo (Plan + Build + Test + Review + Docs)
uv run adw_sdlc_iso.py <issue-number>

# Zero Touch (Auto-merge)
uv run adw_sdlc_zte_iso.py <issue-number>  # ⚠️ Hace merge automático!
```

### Workflows Avanzados (Requieren worktree existente)

```bash
# Obtén el ADW ID del comentario en el issue
# Ejemplo: "a1b2c3d4_ops: ✅ Starting ADW workflow"

# Implementar en worktree existente
uv run adw_build_iso.py <issue-number> <adw-id>

# Testear
uv run adw_test_iso.py <issue-number> <adw-id>

# Revisar
uv run adw_review_iso.py <issue-number> <adw-id>

# Documentar
uv run adw_document_iso.py <issue-number> <adw-id>

# Hacer merge
uv run adw_ship_iso.py <issue-number> <adw-id>
```

## 🔍 Monitorear Progreso

### Ver el ADW ID

Después de ejecutar un workflow, verás un comentario en el issue:

```
a1b2c3d4_ops: ✅ Starting ADW workflow...
```

El ADW ID es `a1b2c3d4`.

### Ver el Worktree

```bash
# Listar todos los worktrees activos
git worktree list

# Navegar al worktree
cd trees/a1b2c3d4/
```

### Ver los Logs

```bash
# Ver output del agente planner
cat agents/a1b2c3d4/planner/raw_output.jsonl | tail -1 | jq .

# Ver estado del workflow
cat agents/a1b2c3d4/adw_state.json | jq .
```

## 🧹 Limpieza

### Remover Worktree Después del Merge

```bash
# Opción 1: Git
git worktree remove trees/a1b2c3d4

# Opción 2: Script
./scripts/purge_tree.sh a1b2c3d4
```

### Limpiar Todos los Worktrees

```bash
# Ver todos los worktrees
git worktree list

# Remover uno por uno
git worktree remove trees/xxx
```

## 🛠️ Scripts Útiles

```bash
# Verificar puertos en uso
./scripts/check_ports.sh

# Iniciar la aplicación
./scripts/start.sh

# Detener aplicaciones
./scripts/stop_apps.sh

# Limpiar comentarios de un issue
./scripts/clear_issue_comments.sh <issue-number>

# Eliminar un PR
./scripts/delete_pr.sh <pr-number>
```

## ❓ Troubleshooting Común

### Error: "ANTHROPIC_API_KEY not set"
```bash
# Verifica que .env existe
ls -la .env

# Verifica que tiene la API key
cat .env | grep ANTHROPIC_API_KEY
```

### Error: "gh: command not found"
```bash
brew install gh
gh auth login
```

### Error: "uv: command not found"
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Error: "No worktree found"
```bash
# Verifica worktrees
git worktree list

# Ejecuta un workflow de entrada (que crea worktree)
uv run adw_plan_iso.py <issue-number>
```

### Error: "Port already in use"
```bash
# Verifica qué usa el puerto
lsof -i :9107

# O usa el script
./scripts/check_ports.sh
```

## 🎓 Próximos Pasos

1. **Lee la documentación completa**: `CLAUDE.md` (sección ADW)
2. **Explora los comandos**: `.claude/commands/`
3. **Revisa los hooks**: `.claude/hooks/`
4. **Lee ADW README**: `adws/README.md`

## 🚨 Recordatorios Importantes

1. **Nunca comites archivos .env** (ya está en .gitignore)
2. **Limpia worktrees después de usar** (ocupan espacio)
3. **Zero Touch Execution hace merge automático** (úsalo con cuidado)
4. **Los agentes consumen API tokens** (monitorea tu uso)
5. **GitHub rate limits aplican** (no abuses de los workflows)

## 💡 Tips

- Usa `adw_plan_build_iso.py` para desarrollo rápido
- Usa `adw_sdlc_iso.py` para features completas con calidad
- Los worktrees permiten trabajar en múltiples issues simultáneamente
- Cada worktree tiene sus propios puertos (9100-9114 backend, 9200-9214 frontend)
- Los planes generados están en `specs/`
- La documentación auto-generada está en `app_docs/`

## 🎉 ¡Listo!

Ya estás listo para usar ADW. Crea tu primer issue en GitHub y ejecútalo con:

```bash
cd adws/
uv run adw_sdlc_iso.py <issue-number>
```

¡Happy coding! 🤖
