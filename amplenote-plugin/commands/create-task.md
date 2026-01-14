Add a task to an existing Amplenote note.

Usage:
  /amplenote:create-task <note-uuid> <task-content>

Examples:
  /amplenote:create-task abc123 "Review documentation"
  /amplenote:create-task xyz789 "Follow up with team"

Options:
  <note-uuid>     - UUID of the note to add task to (required)
  <task-content>  - Task text (required)

Tasks are added to the specified note. You can get the note UUID from `/amplenote:search` or when creating a note.
