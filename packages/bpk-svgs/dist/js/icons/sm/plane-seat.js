import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M12.861 13.105a1 1 0 0 0 0-2H9.525a.958.958 0 0 1-.789-.415L7.568 8.997l-.096-.174-1.307-3.728a.86.86 0 0 0 .814-.856V2.971a.866.866 0 0 0-.866-.866H6V2a1 1 0 0 0-2 0v2.796c0 .113.02.225.057.331l1.538 4.384c.083.219.194.429.328.623l1.167 1.692c.169.245.38.448.607.628V16H6a1 1 0 0 0-1 1h8a1 1 0 0 0-1-1H9.697v-2.894h3.164v-.001z" /></svg>;
  }

}