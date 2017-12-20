import React from 'react';
import PropTypes from 'prop-types';
import SubjectLoading from './SubjectLoading';

export default class SVGImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: false
    };
    this.props.onError();
    this.image = new Image();
    this.image.onload = () => {
      if (this.props.onLoad) this.props.onLoad(this.image);
      this.setState({
        loaded: true
      });
    };
    this.image.onerror = () => {
      if (this.props.onError) this.props.onError();
      this.setState({
        error: true
      });
    };

    if (this.props.src) {
      this.image.src = this.props.src;
    } else {
      this.state.loaded = false;
      this.state.error = true;
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
        <image className="svg-image"
          xlinkHref={this.image.src}
          width={this.image.width}
          height={this.image.height}
          x={(this.image.width * -0.5)+'px'}
          y={(this.image.height * -0.5)+'px'} />
      );

    //TODO: review loading and error indicators.
    } else if (this.state.error) {
      return (
        <g className="svg-image-error">
          <path d="M -60 -80 L 0 -20 L 60 -80 L 80 -60 L 20 0 L 80 60 L 60 80 L 0 20 L -60 80 L -80 60 L -20 0 L -80 -60 Z" />
        </g>
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
