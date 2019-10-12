import Container from "./Container";
import Row from "./Row";

export default {
    install: function(Vue) {
        Vue.component(Container.name, Container);
        Vue.component(Row.name, Row);
    }
};
