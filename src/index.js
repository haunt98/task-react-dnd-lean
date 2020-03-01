import React from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import initData from "./init-data";
import Phase from "./phase";

const Container = styled.div`
  display: flex;
`;

class App extends React.Component {
  state = initData;

  onDragEnd = result => {
    const { draggableId, source, destination } = result;

    if (!destination) {
      return;
    }

    // move but not move
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // same phase
    if (destination.droppableId === source.droppableId) {
      const phase = this.state.phases[source.droppableId];
      const newTaskIDs = Array.from(phase.taskIDs);
      newTaskIDs.splice(source.index, 1);
      newTaskIDs.splice(destination.index, 0, draggableId);
      const newPhase = {
        ...phase,
        taskIDs: newTaskIDs
      };

      const newState = {
        ...this.state,
        phases: {
          ...this.state.phases,
          [newPhase.id]: newPhase
        }
      };

      this.setState(newState);
      return;
    }

    // different phase
    const sourcePhase = this.state.phases[source.droppableId];
    const newSourceTaskIDs = Array.from(sourcePhase.taskIDs);
    // remove source
    newSourceTaskIDs.splice(source.index, 1);
    const newSourcePhase = {
      ...sourcePhase,
      taskIDs: newSourceTaskIDs
    };

    const destinationPhase = this.state.phases[destination.droppableId];
    const newDestinationTaskIDs = Array.from(destinationPhase.taskIDs);
    // add destination
    newDestinationTaskIDs.splice(destination.index, 0, draggableId);
    const newDestinationPhase = {
      ...destinationPhase,
      taskIDs: newDestinationTaskIDs
    };

    const newState = {
      ...this.state,
      phases: {
        ...this.state.phases,
        [newSourcePhase.id]: newSourcePhase,
        [newDestinationPhase.id]: newDestinationPhase
      }
    };

    this.setState(newState);
  };

  render() {
    return (
      <Container>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.phaseOrder.map(phaseID => {
            const phase = this.state.phases[phaseID];
            console.log("phase", phase);

            const tasks = phase.taskIDs.map(taskID => this.state.tasks[taskID]);
            console.log("tasks", tasks);

            return <Phase key={phase.id} phase={phase} tasks={tasks}></Phase>;
          })}
        </DragDropContext>
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
