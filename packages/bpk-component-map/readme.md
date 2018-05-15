# bpk-component-map

> Backpack map component.

## Installation

```sh
npm install bpk-component-map --save-dev
```

## Usage

```js
import React from 'react';
import {BpkMap, BpkMapMarker} from 'bpk-component-map';

export default () => (
  <div>
  <BpkMap zoom={15} centerLatitude={55.944357} centerLongitude={-3.1967116}>
      <BpkMapMarker
        latitude={55.944357}
        longitude={-3.1967116}
        title="Skyscanner"
        type="station"
      />
    </BpkMap>
  </div>
  <div>
    <BpkMap
      boundSouth={40.712216}
      boundWest={-74.226556}
      boundNorth={41.773941}
      boundEast={-74.12544}
      zoomControl={false}
      width="600px"
      height={600}
      language="zh"
    >
     <BpkMapMarker
        latitude={40.944357}
        longitude={-74.1967116}
        title="Skyscanner"
        type="station"
      />
     </BpkMap>
    </div>
)
```


## BpkMap Props
| Property	      | PropType	| Required	| Default Value
| ---------       | --------  | --------  | ------------- |
| width           | string    | false     | 100%          |
| height          | string    | false     | 100%          |
| zoom	          | number	  | false	    | 15            |
| centerLatitude	| number	  | false	    | null          |
| centerLongitude	| number	  | false	    | null          |
| boundSouth	    | number	  | false	    | null          |
| boundWest	      | number	  | false	    | null          |
| boundNorth	    | number	  | false	    | null          |
| boundEast	      | number	  | false	    | null          |
| language	      | string	  | false	    | locale lang   |
| market  	      | string	  | false	    | null          |
| zoomControl	    | bool	    | false	    | true          |
| draggable	      | bool	    | false	    | true          |
| onZoom	        | func	    | false		  | null          |
| onDrag	        | func	    | false	    | null          |
| onClick         | func      | false     | null          |

the zoom, centerLatitude, centerLongitude is one method to load the map using the center point and zoom level
the boundSouth,boundWest,boundNorth,boundEast is one method to load the map using bounding box 

## BpkMapMarker Props

| Property	      | PropType	| Required	| Default Value
| ---------       | --------  | --------  | -------------   |
| latitude		    | number		| true	    |                 |
| longtitude		  | number		| true	    |                 |
| name	    	    | string		| true	    |                 |
| type			      | string		| true	    |                 |
| bpkicon		      | string		| true	    |                 |
| size			      | enum   		| false	    | regular         |
| onMarkerClick	  | func			| false	    |                 |

size enum:
small, regular,large