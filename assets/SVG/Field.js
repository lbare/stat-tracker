import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';

const Field = ({ options }) => (
  <Svg
    id='Layer_1'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    x='0px'
    y='0px'
    viewBox='0 0 612 792'
    style={{
      enableBackground: 'new 0 0 612 792',
    }}
    xmlSpace='preserve'
    height='500'
    width='500'
  >
    {/* Outfield */}
    <Path
      fill={options.outfield.fillColor}
      stroke={options.outfield.strokeColor}
      strokeWidth={options.outfield.strokeWidth}
      className='st0'
      d='M36.51,328.51l102.31,125.44c7.22-10.92,18.84-26.83,34.13-41.29c6.76-6.4,13.36-11.67,14.49-12.57 c11.37-9.06,20.76-14.77,22.7-15.94c4.92-2.96,23.94-14.05,51.66-20.82c11.05-2.7,26.15-5.36,44.3-5.57 c14.78-0.03,32.73,1.68,52.28,7.39c5.32,1.55,19.64,6,36.69,15.17c5.49,2.95,22.38,12.37,40.93,29.3 c16.57,15.12,28.58,30.86,37.19,44.54c34.16-41.89,68.32-83.77,102.48-125.66c5.67-6.95,5.99-16.8,0.86-24.15 c-17.5-25.11-41.07-52.44-72.5-77.3c-34.28-27.12-64.35-40.79-71.98-44.16c-29.8-13.13-55.79-19.02-71.98-21.84 c-25.04-4.38-44.94-4.66-53.98-4.6c-5.09,0.03-24.38,0.3-49.98,4.6c-14.31,2.4-42.5,7.32-75.98,21.84 c-35.36,15.35-58.77,33.7-71.98,44.16c-19.43,15.39-46.76,40.32-72.56,77.38C30.48,311.77,30.86,321.59,36.51,328.51z'
    />
    {/* Infield Dirt */}
    <Path
      fill={options.infieldDirt.fillColor}
      stroke={options.infieldDirt.strokeColor}
      strokeWidth={options.infieldDirt.strokeWidth}
      className='st0'
      d='M138.92,454.05l159.5,195.51c4,4.91,11.5,4.91,15.5,0l159.5-195.51c-9.1-14.34-24.45-34.89-48.56-53.95 c-20.56-16.25-38.59-24.45-43.16-26.47c-17.87-7.87-33.45-11.4-43.16-13.1c-15.02-2.62-26.95-2.79-32.37-2.76 c-3.05,0.02-14.62,0.18-29.97,2.76c-8.58,1.44-25.49,4.39-45.56,13.1c-21.21,9.2-35.24,20.2-43.16,26.47 C174.54,410.33,155.79,427.61,138.92,454.05z'
    />
    {/* Home */}
    <Path
      fill={options.home.fillColor}
      stroke={options.home.strokeColor}
      strokeWidth={options.home.strokeWidth}
      className='st0'
      d='M298.28,627.61h15.79c2.48,0,4.48,2.01,4.48,4.48v7.74c0,1.34-0.6,2.62-1.64,3.47l-7.89,6.46c-1.65,1.35-4.03,1.35-5.68,0 l-7.89-6.46c-1.04-0.85-1.64-2.12-1.64-3.47v-7.74C293.79,629.62,295.8,627.61,298.28,627.61z'
    />
    {/* Infield Grass */}
    <Path
      fill={options.infieldGrass.fillColor}
      stroke={options.infieldGrass.strokeColor}
      strokeWidth={options.infieldGrass.strokeWidth}
      className='st0'
      d='M234.46,511.09c0.38,4.81-1.6,10.2-2.55,12.46c-0.29,0.69-0.17,1.47,0.3,2.05l59.26,72.68 c0.54,0.66,1.44,0.9,2.24,0.61c2.5-0.93,8.03-2.79,12.39-2.92c4.51,0.1,9.92,1.66,12.35,2.44c0.78,0.25,1.64-0.01,2.16-0.65 l58.7-72.13c0.42-0.51,0.56-1.2,0.37-1.84c-0.69-2.28-1.93-7.79-1.97-12.4c-0.02-2.57,1.33-8.12,1.95-10.52 c0.18-0.71-0.04-1.46-0.58-1.96c-3.56-3.3-18.68-17.28-58.36-53.79c-0.58-0.54-1.43-0.7-2.16-0.39c-2.12,0.89-6.9,2.6-12.45,2.6 c-5.54,0.01-10.38-1.7-12.5-2.58c-0.72-0.3-1.54-0.14-2.11,0.38l-59.02,54.37c-0.63,0.58-0.83,1.5-0.49,2.29 C232.78,503.74,234.18,507.52,234.46,511.09z'
    />

    {/* 1st Base */}
    <Path
      fill={options.bases.fillColor}
      stroke={options.bases.strokeColor}
      strokeWidth={options.bases.strokeWidth}
      className='st0'
      d='M420.63,513.1l-4.47,5.32c-1.19,1.41-3.29,1.6-4.71,0.41l-5.32-4.47c-1.41-1.19-1.6-3.29-0.41-4.71l4.47-5.32 c1.19-1.41,3.29-1.6,4.71-0.41l5.32,4.47C421.63,509.58,421.81,511.68,420.63,513.1z'
    />
    {/* 2nd Base */}
    <Path
      fill={options.bases.fillColor}
      stroke={options.bases.strokeColor}
      strokeWidth={options.bases.strokeWidth}
      className='st0'
      d='M313.45,422.32l-4.92,4.92c-1.31,1.31-3.42,1.31-4.73,0l-4.91-4.92c-1.31-1.31-1.31-3.42,0-4.73l4.91-4.91 c1.31-1.31,3.42-1.31,4.73,0l4.91,4.91C314.75,418.9,314.75,421.02,313.45,422.32z'
    />
    {/* 3rd Base */}
    <Path
      fill={options.bases.fillColor}
      stroke={options.bases.strokeColor}
      strokeWidth={options.bases.strokeWidth}
      className='st0'
      d='M190.71,512.1l4.47,5.32c1.19,1.41,3.29,1.6,4.71,0.41l5.32-4.47c1.41-1.19,1.6-3.29,0.41-4.71l-4.47-5.32 c-1.19-1.41-3.29-1.6-4.71-0.41l-5.32,4.47C189.71,508.58,189.53,510.68,190.71,512.1z'
    />
    {/* Mound */}
    <Path
      fill={options.mound.fillColor}
      stroke={options.mound.strokeColor}
      strokeWidth={options.mound.strokeWidth}
      className='st0'
      d='M304.42 490.55c-11.92.73-21.6 10.45-22.31 22.37-.35 5.98 1.5 11.51 4.82 15.87 12.23 11.66 1.87 27.34 18.99 27.34 16.99 0 6.9-16.04 18.99-27.34 3.05-4.01 4.86-9.01 4.86-14.43.02-13.68-11.49-24.67-25.35-23.81z'
    />
    {/* Rubber */}
    <Path
      d='M310.37 516.66h-8.75c-1.09 0-1.97-.88-1.97-1.97v-1.6c0-1.09.88-1.97 1.97-1.97h8.75c1.09 0 1.97.88 1.97 1.97v1.6c0 1.09-.88 1.97-1.97 1.97z'
      fill={options.rubber.fillColor}
      stroke={options.rubber.strokeColor}
      strokeWidth={options.rubber.strokeWidth}
    />
  </Svg>
);
export default Field;
