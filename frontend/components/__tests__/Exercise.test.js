import { render, screen, userEvent } from '@testing-library/react-native';
import Exercises from '../Exercise';

test('PageRenders', async () => {

    const exercises =[
        {
          "e_id": 0,
          "name": "Bench Press",
          "category": "Strength",
          "type": "Push",
          "description": "Lie with your back on a weight bench and then lower a barbell to your chest and press it back up",
          "muscle_group": "Chest",
          "duration": "60",
          "equipment": "Bench, barbell",
          "id": "5634601401712640",
          "user": "auth0|6486842ce70d24cefd414c3b",
        },
        {
         "e_id" : 1,
          "name": "Push-ups",
          "category": "Strength",
          "type": "Push",
          "description": "From the plank position, lower yourself to the floor and then push up",
          "muscle_group": "Chest",
          "duration": "60",
          "equipment": "None",
          "id": "209450140583941",
          "user": "auth0|6486842ce70d24cefd414c3b",
        }]

    const user = userEvent.setup();
    render(<Exercises exercises={exercises} />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
    
  });