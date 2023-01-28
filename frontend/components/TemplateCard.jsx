
// {key, id, rows, columns, room_strength, counts_in_bench, rooms}

const TemplateCard = ({key, id, rows, columns, room_strength, counts_in_bench, rooms}) => {
  return (
    <div className="w-[250px] h-[250px] bg-white p-4 m-4 rounded-xl shadow-lg hover:shadow-custom transition backdrop-blur-lg">
        <p className="font-bold text-4xl p-2">Template Card</p>
        <p className="font-bold text-2xl p-2"> ID: {id}</p>
    </div>
  )
}

export default TemplateCard