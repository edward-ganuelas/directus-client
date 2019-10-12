import Container from "@/components/bootstrap/Container";
import Row from "@/components/bootstrap/Row";

export default {
    install: function(Vue) {
        Vue.component(Container.name, Container);
        Vue.component(Row.name, Row);
    }
};
