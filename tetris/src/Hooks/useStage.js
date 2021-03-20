import {useState} from 'react';
import {createStage} from '../StagePieces/gameHelper';

export const useStage = () => {
  const [stage, setStage] = useState(createStage());

  return [stage, setStage];
}