import './ExtensionCard.css';
import logoDevlens from '../assets/images/logo-devlens.svg';
import logoStyleSpy from '../assets/images/logo-style-spy.svg';
import logoSpeedBoost from '../assets/images/logo-speed-boost.svg';
import logoJsonWizard from '../assets/images/logo-json-wizard.svg';
import logoTabMasterPro from '../assets/images/logo-tab-master-pro.svg';
import logoViewportBuddy from '../assets/images/logo-viewport-buddy.svg';
import logoMarkupNotes from '../assets/images/logo-markup-notes.svg';
import logoGridGuides from '../assets/images/logo-grid-guides.svg';
import logoPalettePicker from '../assets/images/logo-palette-picker.svg';
import logoLinkChecker from '../assets/images/logo-link-checker.svg';
import logoDomSnapshot from '../assets/images/logo-dom-snapshot.svg';
import logoConsolePlus from '../assets/images/logo-console-plus.svg';
import fallbackLogo from '../assets/images/logo.svg';

function ExtensionCard({ extension, onToggle, onRemove, onRestore }) {
  const iconMap = {
    'DevLens': logoDevlens,
    'StyleSpy': logoStyleSpy,
    'SpeedBoost': logoSpeedBoost,
    'JSONWizard': logoJsonWizard,
    'TabMaster Pro': logoTabMasterPro,
    'ViewportBuddy': logoViewportBuddy,
    'Markup Notes': logoMarkupNotes,
    'GridGuides': logoGridGuides,
    'Palette Picker': logoPalettePicker,
    'LinkChecker': logoLinkChecker,
    'DOM Snapshot': logoDomSnapshot,
    'ConsolePlus': logoConsolePlus,
  };

  const iconSrc = iconMap[extension.name] || fallbackLogo;

  return (
    <div className="extension-card">
      <div className="extension-main">
        <div className="extension-icon">
          <img src={iconSrc} alt={`${extension.name} icon`} />
        </div>
        <div className="extension-content">
          <h3 className="extension-name">{extension.name}</h3>
          <p className="extension-description">{extension.description}</p>
        </div>
      </div>
      <div className="extension-actions">
        {extension.deleted ? (
          <button
            className="remove-button"
            onClick={() => onRestore && onRestore(extension.id)}
          >
            Restore
          </button>
        ) : (
          <>
            <button 
              className="remove-button"
              onClick={() => onRemove(extension.id)}
            >
              Remove
            </button>
            <button
              className={`toggle-switch ${extension.active ? 'active' : ''}`}
              onClick={() => onToggle(extension.id)}
              aria-label={`${extension.active ? 'Deactivate' : 'Activate'} ${extension.name}`}
            >
              <span className="toggle-slider"></span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ExtensionCard;

