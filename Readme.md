# My Foray into D3.js

# SVG Paths

```html
<path d="M150 0 L75 200 L225 200 Z" />

M=moveto L=lineto Z=closepath
```

D3 generates these strings for us.

# Data method

The Data method allows us to dynamically set objects on an SVG object.

```javascript
const data = [
	{
		width: '100',
		height: '100',
		fill: 'red'
	}
];

const rect = svg
	.select('rect')
	.data(data)
	.attr('width', d => {
		return d.width;
	})
	.attr('height', d => {
		return d.height;
	})
	.attr('fill', d => {
		return d.fill;
	});
```

# Why we need Linear Scales

Data
{name:'something',orders:420},
{name:'a thing', orders:480},
{name:'burger',orders:240}

If our svg canvas is 600\*600, visualizing the screen is easy using a graph. However, if one of the data attributes we receive is as below
{name:'something', orders:3000}. Visualizing the value of orders now in pixel would not be possible as 3000px would not stretch outside our screen. Hence we need to scale down the value so we can see them at a reasonable height on the screen.

# Linear Scales

```javascript
const y = d3
	.scaleLinear()
	.domain([0, 1000])
	.range([0, 500]);
```

# Band Scales

In 'menu.js', we initially set the width to be constant which was 70px and scaled the height to fit our screen. However, if we receive a large number of data, the bars are going to flow out of the svg container and hence the width needs to be scaled too.
The bandwidth function gives me the width of each bar.

```javascript
const x = d3
	.scaleBand()
	.domain(data.map(item => item.name))
	.range([0, 500])
	.paddingInner(0.2)
	.paddingOuter(0.2);

console.log(x.bandwidth());
```

# Min value, Max, Extent

```javascript
const min = d3.min(data, d => d.orders);
//200

const max = d3.max(data, d => d.orders);
//900

const extent = d3.extent(data, d => d.orders);
//200,900
```

# Tricking Elements of creating a bar graph

1. Create a graph group with margins. The CSS translate() function is used to move elements in a two-dimensional space. It moves the position of the element on the plane by the amount provided by tx and ty .

```javascript
const graph = svg
	.append('g')
	.attr('width', graphWidth)
	.attr('height', graphHeight)
	.attr('transform', `translate(${margin.left},${margin.top})`);
```

2. Creating x and y axes

```javascript
const xAxisGroup = graph
	.append('g')
	.attr('transform', `translate(0, ${graphHeight})`);
const yAxisGroup = graph.append('g');
```

3. Re-writing the range and setting it to graphHeight

```javascript
const y = d3
	.scaleLinear()
	.domain([0, d3.max(data, d => d.orders)])
	.range([graphHeight, 0]);
```

4. Creating and calling the axes

```javascript

const xAxis = d3.axisBottom(x);
	const yAxis = d3.axisLeft(y);

	xAxisGroup.call(xAxis);
	yAxisGroup.call(yAxis);
});
```

5. In D3, the values of svg elements like circle can only be set as left and top. The bar graphs always look inverted on screen like this.

```javascript

.attr('x', d => x(d.name))
		.attr('y', d => y(d.orders));
```

# Enter and Exit Groups

It is used to keep track of what elements are currently in the DOM. When we join data to elements, it keeps track of how many elements need to enter the DOM and how many elements need to be taken out of the DOM.

# Updated Pattern in D3

1. Update scales(domains) if they rely on our data
2. Join updated data to elements
3. Remove unwanted (if any) shapes using the exit selection
4. Remove unwanted (if any) shapes using the exit selection
5. Update current shapes in the dom



