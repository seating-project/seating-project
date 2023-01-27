import {jsPDF} from 'jspdf'
import html2canvas from 'html2canvas'

const Test = () => {

    const printDocument = () => {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('../assets/cit.png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
          })
        ;
      }

  return (
    <div>
      <div className="mb5">
        <button onClick={printDocument}>Print</button>
      </div>
      <div id="divToPrint" className="mt4 bg-[#f5f5f5] w-[210mm] min-h-[297mm] ml-auto mr-auto">
        <div>Note: Here the dimensions of div are same as A4</div> 
        <div>You Can add any component here</div>
      </div>
    </div>
  )
}

export default Test