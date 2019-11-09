// import PropTypes from 'prop-types';
import * as React from "react";
import Datamaps from "datamaps";

const MAP_CLEARING_PROPS = ["height", "scope", "setProjection", "width"];

const propChangeRequiresMapClear = (oldProps, newProps) => {
  return MAP_CLEARING_PROPS.some(key => oldProps[key] !== newProps[key]);
};

export default class Datamap extends React.Component<any> {
  map: any;
  constructor(props: any) {
    super(props);
    this.resizeMap = this.resizeMap.bind(this);
  }

  componentDidMount() {
    if (this.props.responsive) {
      window.addEventListener("resize", this.resizeMap);
    }
    this.drawMap();
  }

  componentWillReceiveProps(newProps: any) {
    if (propChangeRequiresMapClear(this.props, newProps)) {
      this.clear();
    }
  }

  componentDidUpdate() {
    this.drawMap();
  }

  componentWillUnmount() {
    this.clear();

    if (this.props.responsive) {
      window.removeEventListener("resize", this.resizeMap);
    }
  }

  clear() {
    const container: any = this.refs.container;

    for (const child of Array.from(container.childNodes)) {
      container.removeChild(child);
    }

    delete this.map;
  }

  drawMap() {
    const {
      arc,
      arcOptions,
      bubbles,
      bubbleOptions,
      data,
      graticule,
      labels,
      updateChoroplethOptions,
      ...props
    } = this.props;

    let map = this.map;

    if (!map) {
      map = this.map = new Datamaps({
        ...props,
        data,
        element: this.refs.container
      });
    } else {
      map.updateChoropleth(data, updateChoroplethOptions);
    }

    if (arc) {
      map.arc(arc, arcOptions);
    }

    if (bubbles) {
      map.bubbles(bubbles, bubbleOptions);
    }

    if (graticule) {
      map.graticule();
    }

    if (labels) {
      map.labels();
    }
  }

  resizeMap() {
    this.map.resize();
  }

  render() {
    const style = {
      height: "105%",
      width: "90%",
      ...this.props.style
    };
    return <div ref="container" style={style} />;
  }
}
