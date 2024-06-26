import { extendTheme } from '@chakra-ui/react';
import { CardComponent } from './additions/card/card';
import { buttonStyles } from './components/button';
import { badgeStyles } from './components/badge';
import { inputStyles } from './components/input';
import { progressStyles } from './components/progress';
import { sliderStyles } from './components/slider';
import { textareaStyles } from './components/textarea';
import { switchStyles } from './components/switch';
import { linkStyles } from './components/link';
import { breakpoints } from './foundations/breakpoints';
import { globalStyles } from './styles';

export default extendTheme(
  // Breakpoints
  { breakpoints },
  globalStyles, // badge styles
  badgeStyles, // button styles
  buttonStyles, // link styles
  linkStyles, // progress styles
  progressStyles, // slider styles
  sliderStyles, // input styles
  inputStyles, // textarea styles
  textareaStyles, // switch styles
  switchStyles, // card component
  CardComponent,
);
