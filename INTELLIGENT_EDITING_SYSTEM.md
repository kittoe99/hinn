# Intelligent Code Editing System

## Overview
A complete RAG-based system that intelligently decides between full code generation and surgical targeted edits.

## Architecture

### 1. Intelligent Router (`intelligentRouter.ts`)
**Purpose:** Analyzes user requests and decides the appropriate editing mode.

**Decision Rules:**
1. **No existing files** → Full Generation
2. **Element selected** → Targeted Edit  
3. **Keywords like "rebuild", "recreate"** → Full Generation
4. **Keywords like "change", "fix", "update"** → Targeted Edit
5. **Specific scope ("the header", "this button")** → Targeted Edit
6. **New features** → Targeted Edit (if adding) or Full Generation (if major)
7. **Default** → Targeted Edit (for existing projects)

**Confidence Scoring:**
- 1.0 = Absolute certainty
- 0.95 = Very high confidence
- 0.85-0.9 = High confidence
- 0.6-0.75 = Medium confidence

### 2. Smart Generation API (`smart-generate.post.ts`)
**Purpose:** Orchestrates the generation process based on router decision.

**Flow:**
```
User Request
    ↓
Intelligent Router Analysis
    ↓
Decision: Full Generation OR Targeted Edit
    ↓
Route to appropriate handler
    ↓
Stream results back
```

**Targeted Edit Mode:**
- Identifies target files only
- Provides minimal context
- Uses low temperature (0.3) for precision
- Instructs AI to make minimal changes
- Returns complete file with only requested changes

**Full Generation Mode:**
- Creates entire project from scratch
- Uses higher temperature (0.7) for creativity
- Can use search tools
- Returns all necessary files

### 3. System Instructions

**Targeted Edit Instruction:**
```
- Read existing code carefully
- Identify EXACT location to change
- Generate ONLY modified portion
- Preserve ALL other code
- Return complete file with minimal changes
```

**Full Generation Instruction:**
```
- Create complete web project
- Use modern best practices
- Responsive design
- Production-ready code
```

## Usage Examples

### Targeted Edit Examples:
✅ "Change the button color to blue"
✅ "Make the header sticky"
✅ "Fix the mobile menu"
✅ "Add a contact form below the hero"
✅ "Update the footer text"

### Full Generation Examples:
✅ "Rebuild the entire site"
✅ "Recreate from scratch"
✅ "Complete redesign"
✅ "Start over with a new design"
✅ "Create a landing page for a coffee shop"

## Key Features

1. **Intelligent Routing**
   - Automatic decision making
   - Confidence scoring
   - Reasoning transparency

2. **Targeted Editing**
   - Surgical precision
   - Minimal code changes
   - File preservation
   - Context-aware

3. **Full Generation**
   - Complete projects
   - Modern design
   - Best practices
   - Search integration

4. **File Management**
   - Only target files analyzed
   - Unchanged files preserved
   - Proper merging
   - No data loss

## Benefits

✅ **Smart** - Automatically chooses the right approach
✅ **Fast** - Targeted edits are much faster
✅ **Safe** - Preserves working code
✅ **Precise** - Surgical changes only
✅ **Transparent** - Shows decision reasoning
✅ **Flexible** - Handles both scenarios

## Integration

The system is integrated into the builder through:
- `useBuilderGeneration` composable
- Automatic routing in `handleGenerate`
- Seamless user experience
- No manual mode selection needed

## Testing

**To test targeted editing:**
1. Generate a website
2. Make a small change request (e.g., "make the button blue")
3. Verify only the button changed
4. Check other files remain intact

**To test full generation:**
1. Request "rebuild the site"
2. Verify complete regeneration
3. Check all files are new

## Monitoring

The system logs:
- Decision mode and confidence
- Reasoning for decision
- Target files identified
- Generation progress
- File counts before/after
