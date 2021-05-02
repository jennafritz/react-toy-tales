import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = ({toys, deleteToy, likeToy}) => {
  // console.log(toys)
  return(
    <div id="toy-collection">
      {toys.map((toy) => <ToyCard key={toy.id} toy={toy} deleteToy={deleteToy} likeToy={likeToy}/>)}
    </div>
  );
}

export default ToyContainer;
