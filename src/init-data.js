const initData = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "task 1 clean the house"
    },
    "task-2": {
      id: "task-2",
      content: "task 2 clean the clothers"
    },
    "task-3": {
      id: "task-3",
      content: "task 3 sleep"
    }
  },
  phases: {
    "phase-1": {
      id: "phase-1",
      title: "phase 1 TODO",
      taskIDs: ["task-1", "task-2", "task-3"]
    },
    "phase-2": {
      id: "phase-2",
      title: "phase 2 DO",
      taskIDs: []
    },
    "phase-3": {
      id: "phase-3",
      title: "phase 3 DONE",
      taskIDs: []
    }
  },
  phaseOrder: ["phase-1", "phase-2", "phase-3"]
};

export default initData;
