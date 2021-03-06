import Component from "../core/Component.mjs";
import { catClient } from "../api/catClient.mjs"

export default class ImageInfo extends Component {
  setup() {
    const { catInfo } = this.props;
    this.state = {
      catInfo,
    }

    this.active();
    this.loadingAdditionalCatInfo();
  }

  template() {
    const { catInfo } = this.state;
    const { name, url, temperament, origin } = catInfo;
    return `
    <div class="content-wrapper">
      <div class="title">
        <span>${name}</span>
        <div class="close">x</div>
      </div>
      <img src="${url}" alt="${name}"/>        
      <div class="description">
        <div>성격: ${temperament}</div>
        <div>태생: ${origin}</div>
      </div>
    </div>`;
  }

  setEvents() {
    const { closeImageInfo } = this.props;
    this.addEventListener("click", ".ImageInfo", (e) => {
      if (e.target === e.currentTarget || e.target.classList.contains("close")) {
        this.target.classList.remove("active");
        setTimeout(closeImageInfo, 500);
      }
    });
    
    this.onESC = (e) => {
      if (e.key !== "Escape") return;
      closeImageInfo();
    }
    addEventListener("keydown", this.onESC);
  }

  beforeUnmount() {
    removeEventListener("keydown", this.onESC);
  }

  active() {
    // for transition
    setTimeout(() => {
      this.target.classList.add("active");
    }, 0);
  }

  async loadingAdditionalCatInfo() {
    let { catInfo } = this.state;
    catInfo = (await catClient.fetchCatInfo(catInfo.id)).data ?? catInfo;
    this.setState({ catInfo });
  }
}
