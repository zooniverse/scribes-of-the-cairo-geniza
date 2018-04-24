import React from 'react';
import PropTypes from 'prop-types';
import { getActiveLanguage } from 'react-localize-redux';
import { StepThrough } from 'zooniverse-react-components';
import { Markdown } from 'markdownz';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { TRANSLATION_STATUS } from '../ducks/translations';

const ITEMS_PER_PAGE = 8;

class FieldGuide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
      groupedItems: []
    };

    this.deactivateCard = this.deactivateCard.bind(this);
  }

  componentWillMount() {
    this.groupItems();
  }

  componentDidMount() {
    if (this.props.rtl) {
      this.goToEnd();
    }
  }

  componentWillReceiveProps(next) {
    if (next.currentLanguage !== this.props.currentLanguage) {
      this.groupItems(next.currentLanguage);

      if (next.rtl) {
        this.goToEnd();
      }
    }
  }

  goToEnd() {
    let steps = Math.floor(this.props.guide.items.length / ITEMS_PER_PAGE);

    while (steps > 0) {
      steps -= 1;
      this.stepThrough.goNext();
    }
  }

  groupItems(language = this.props.currentLanguage) {
    const groupedItems = [];
    if (this.props.guide && this.props.guide.items) {
      const items = this.findTranslations(language);

      while (items.length > 0) {
        groupedItems.push(items.splice(0, ITEMS_PER_PAGE));
      }
    }
    this.setState({ groupedItems });
  }

  findTranslations(language) {
    const items = this.props.guide.items.slice();

    if (this.props.translationStatus === TRANSLATION_STATUS.READY) {
      const translations = (this.props.translatedGuide && this.props.translatedGuide[language])
        ? this.props.translatedGuide[language] : null;
      if (translations) {
        items.map((item, i) => {
          item.title = translations[`items.${i}.title`];
          item.content = translations[`items.${i}.content`];
        });
      }
    }
    return items;
  }

  activateCard(activeCard) {
    this.setState({ activeCard });
  }

  deactivateCard() {
    this.setState({ activeCard: null });
  }

  renderItem(items, index) {
    return (
      <div className="field-guide" key={`FIELD_GUIDE_PAGE_${index}`}>
        {items.map((item, i) => {
          const resource = item.icon;
          let src;
          if (this.props.icons[resource]) {
            src = this.props.icons[resource].src;
          }
          return (
            <div key={`FIELD_GUIDE_CARD_${index}-${i}`}>
              <button onClick={this.activateCard.bind(this, item)}>
                {src && (
                  <img alt="" src={src} />
                )}
                <span className="instructions">{item.title}</span>
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  renderActiveCard() {
    if (!this.state.activeCard) { return null; }
    const card = this.state.activeCard;

    return (
      <div className="active-card">
        <button onClick={this.deactivateCard}>
          <i className="fa fa-arrow-left" />Back
        </button>

        <div className="active-card__content">
          <div>
            {card.title && (
              <h2>{card.title}</h2>
            )}

            {card.content && (
              <Markdown content={card.content} />
            )}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div
        className={classnames('handle', {
          'field-guide-flip': this.props.rtl
        })}
      >
        {this.state.activeCard && (this.renderActiveCard())}

        {!this.state.activeCard && (
          <StepThrough ref={(el) => { this.stepThrough = el; }}>
            {this.state.groupedItems.map((items, i) => {
              return this.renderItem(items, i);
            })}
          </StepThrough>
        )}
      </div>
    );
  }
}

FieldGuide.defaultProps = {
  currentLanguage: 'en',
  guide: {},
  icons: {},
  rtl: false,
  translatedGuide: {},
  translationStatus: TRANSLATION_STATUS.IDLE
};

FieldGuide.propTypes = {
  currentLanguage: PropTypes.string,
  guide: PropTypes.shape({
    id: PropTypes.string,
    items: PropTypes.array
  }),
  icons: PropTypes.object,
  rtl: PropTypes.bool,
  translatedGuide: PropTypes.object,
  translationStatus: PropTypes.string
};

const mapStateToProps = state => ({
  currentLanguage: getActiveLanguage(state.locale).code,
  rtl: state.languages.rtl,
  translatedGuide: state.translations.strings.field_guide,
  translationStatus: state.translations.status
});

export default connect(mapStateToProps)(FieldGuide);
