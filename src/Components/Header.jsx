
import removeIcon from "../assets/images/icon-remove.svg";
const Header = ({filters, clearFilters, removeFilter}) => {
    return (
        <header>
        {
            (filters.length > 0) &&
          <section className="flex">
            <div className="flex">
                {
                    filters.map(filter => {
                        return (
                              <p className="filters">
                                <span>{filter.value}</span>
                                <button onClick={() => removeFilter(filter)}>
                                <img src={removeIcon} alt="remove" />
                                </button>
                            </p>
                        )
                    })
                }
            </div>
  
            <button className="clear" onClick={clearFilters}>Clear</button>
          </section>
        }
        </header>
    )
}

export default Header;