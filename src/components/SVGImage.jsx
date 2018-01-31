import React from 'react';
import PropTypes from 'prop-types';
import SubjectLoading from './SubjectLoading';

export default class SVGImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };

    this.image = new Image();
    this.image.onload = () => {
      if (this.props.onLoad) this.props.onLoad(this.image);
      this.setState({
        loaded: true
      });
    };
    this.image.onerror = () => {
      if (this.props.onError) this.props.onError();
    };

    if (this.props.src) {
      this.image.src = this.props.src;
    } else {
      this.state.loaded = false;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.image.src) {
      this.image.src = nextProps.src;
    }
  }

  render() {
    if (this.state.loaded) {
      return (
        <image
          className="svg-image"
          xlinkHref={this.image.src}
          width={this.image.width}
          height={this.image.height}
          x={(this.image.width * -0.5) + 'px'}
          y={(this.image.height * -0.5) + 'px'}
        />
      );
    }
    return <SubjectLoading loaded={this.state.loaded} />;
  }
}

SVGImage.propTypes = {
  src: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func
};

SVGImage.defaultProps = {
  src: null,
  onLoad: null,
  onError: null
};
