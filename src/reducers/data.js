// 存放reducers的映射数据

export default function mapStateToProps(state) {
    return {
        contentTab1: state.contentTab1,
        contentTab2: state.contentTab2,
    };
}