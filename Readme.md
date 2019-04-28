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

![Screenshot_2019-04-27 Визуализация данных с помощью D3 js и Firebase - Видеоуроки](https://user-images.githubusercontent.com/15992276/56857407-16527380-693b-11e9-80c7-21ad4635bd37.png)

# Why we need Linear Scales

Sample Data:

```javascript
{name:'something',orders:420},
{name:'a thing', orders:480},
{name:'burger',orders:240}
```

If our svg canvas is 600\*600, visualizing the screen is easy using a graph. However, if one of the data attributes we receive is as below
{name:'something', orders:3000}. Visualizing the value of orders now in pixel would not be possible as 3000px would not stretch outside our screen. Hence we need to scale down the value so we can see them at a reasonable height on the screen.

# Linear Scales
![Screenshot_2019-04-27 Визуализация данных с помощью D3 js и Firebase - Видеоуроки(1)](https://user-images.githubusercontent.com/15992276/56857402-16527380-693b-11e9-9b6d-1733edd1c6c1.png)


```javascript
const y = d3
	.scaleLinear()
	.domain([0, 1000])
	.range([0, 500]);
```

# Band Scales

In 'menu.js', we initially set the width to be constant which was 70px and scaled the height to fit our screen. However, if we receive a large number of data, the bars are going to flow out of the svg container and hence the width needs to be scaled too.
The bandwidth function gives me the width of each bar.

![Screenshot_2019-04-27 Визуализация данных с помощью D3 js и Firebase - Видеоуроки(1)](https://user-images.githubusercontent.com/15992276/56857402-16527380-693b-11e9-9b6d-1733edd1c6c1.png)
![Screenshot_2019-04-27 Визуализация данных с помощью D3 js и Firebase - Видеоуроки(2)](https://user-images.githubusercontent.com/15992276/56857403-16527380-693b-11e9-894b-b6b920a3b597.png)

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
![Capture](https://user-images.githubusercontent.com/15992276/56857401-16527380-693b-11e9-88b5-5921c23f3525.JPG)

Hence we set our x and y attributes as below.

```javascript

.attr('x', d => x(d.name))
		.attr('y', d => y(d.orders));
```




![Screenshot_2019-04-27 Визуализация данных с помощью D3 js и Firebase - Видеоуроки(3)](https://user-images.githubusercontent.com/15992276/56857404-16527380-693b-11e9-9977-4661d02c2515.png)
![Screenshot_2019-04-27 Визуализация данных с помощью D3 js и Firebase - Видеоуроки(4)](https://user-images.githubusercontent.com/15992276/56857405-16527380-693b-11e9-8669-a213609c8e39.png)
![Screenshot_2019-04-27 Визуализация данных с помощью D3 js и Firebase - Видеоуроки(5)](https://user-images.githubusercontent.com/15992276/56857406-16527380-693b-11e9-991e-3654dae16fd0.png)




