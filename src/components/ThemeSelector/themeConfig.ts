import { Theme } from '../../context/ThemeContext';

// import * as colors from '../../styles/_variables.scss';

export interface ThemeConfig {
  id: Theme;
  name: string;
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'original-light' as const,
    name: 'Original Light',
    backgroundColor: '#FFFFFF',
    textColor: '#313237',
    buttonColor: '#313237',
  },
  {
    id: 'original-dark' as const,
    name: 'Original Dark',
    backgroundColor: '#0F1121',
    textColor: '#F1F2F9',
    buttonColor: '#905BFF',
  },
  {
    id: 'rounded-purple-blue' as const,
    name: 'Rounded Purple Blue ',
    backgroundColor: '#F1F2F9',
    textColor: '#0F0F11',
    buttonColor: '#4219D0',
  },
  {
    id: 'rounded-blue' as const,
    name: 'Rounded Blue',
    backgroundColor: '#01F8FF',
    textColor: '#0F0F11',
    buttonColor: '#216CFF',
  },
  {
    id: 'rounded-purple-orange' as const,
    name: 'Rounded Purple Orange',
    backgroundColor: '#FFC4AA',
    textColor: '#0F0F11',
    buttonColor: '#F86800',
  },
];

export type ThemeConfigArray = typeof THEMES;
