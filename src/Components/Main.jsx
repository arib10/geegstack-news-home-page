import JobList from "./JobList";

const Main = ({jobs, addFilter}) => {

    return (
        <main>
            {
                jobs.map((job, index) => {
                    return(
                    <JobList 
                    key={index}
                    job={job}
                    addToFilters={addFilter}
                    />
                    )
                })
            }
        </main>
    )
}

export default Main;