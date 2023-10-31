import One from '@/boards/One';
import Two from '@/boards/Two';
import Bottom, { Sheet } from 'bottoms/react';

const Layout = () => {
console.log('LAYOUT TRIGGERED.')
  return (
    <Bottom>
      <Sheet name='One' component={One} />
      <Sheet name='Two' component={Two} />
      {/* Add more sheets as needed */}
    </Bottom>
  )

}

// (Optional): To autocomplete your routes using Typescript
const Types = [
  'One',
  'Two',
  // <--Add here
]

export default Layout;
export { Types }
