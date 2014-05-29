#simpleSlider 0.2
##Description

A simple image slider with controls.

by: Marc Pampols [http://marcpampols.com](http://marcpampols.com)

##Step 1: Installation

```html
<!-- jQuery library -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>

<!-- simpleSlider JavaScript file -->
<script src="/js/simpleslider/jquery.simpleslider.min.js"></script>

<!-- simpleSlider CSS file -->
<link href="/css/simpleslider/jquery.simpleslider.css" rel="stylesheet" />
```

###Step 2: Call the simpleSlider

```javascript
$(document).ready(function(){
	$('.simpleSlider').simpleSlider();
});
```

##Configuration options

###General

**transitionSpeed**
Type of transition between slides
```
default: 'slow'
options: 'slow', 'fast'
```

**firstActive**
Set the first slide to be active

**order**
Set the slider ordering
```
default: 'asc'
options: 'asc', 'desc', 'random'
```

**autoplay**
Enable/disable autoplay
```
default: false
options: true, false
```


## Changelog

### Version 0.2

* cleanup and some enhancements

### Version 0.1

* first commit
