const oracledb = require('oracledb');

//oracledb.initOracleClient({ libDir: process.env.DATA_KEY||'C:\\instantclient_19_11'});

oracledb.initOracleClient({ libDir: process.env.DATA_KEY||'/usr/lib/oracle/21/client64/bin' });

class Db {
    static instance=new Db();
    constructor(){
        this.connection;
       
    }

    
    start = async() =>{
        try {
            this.connection = await oracledb.getConnection({ user: "admin", password: "Apexaplicacion123", connectionString: "apexapli_high" })
            console.log('DB CONNECTED')
            
        } catch (error) {
            console.log(error)
        }
       
    }

    getEstudiante = async (id) =>{
      const sql = `select * from APEXAPP.Estudiantes WHERE estudiante_id=${id}`;
     
      
      const res = await this.connection.execute(sql);
      this.connection.commit(); 
      
      return res.rows;  
  
    }

    getEstudiantes = async () =>{
     
     // const sql = "INSERT INTO ADBSNMP.table_wish (person_id,wish)  VALUES ("+id_person+",'"+wish+"')";
      const sql = "select * from APEXAPP.Estudiantes";
      console.log(sql)
      const res = await this.connection.execute(sql);
      this.connection.commit(); 
      return res  
  
  }

  getNotas = async (id) =>{
    const sql = `select * from APEXAPP.Notas WHERE nota_id=${id}`;
     
    const res = await this.connection.execute(sql);
    this.connection.commit(); 
    console.log(res)
    return res.rows
  }
   
  


 /* createNewCommentByIdPost= async (id,comment) =>{
    const sql = "INSERT INTO notas (post_id, post_comment) VALUES ("+id+", '"+comment+"')"

    const res = await this.connection.execute(sql);
    this.connection.commit(); 
    console.log(res)
    return res  
  }

*/


}




module.exports={
    Db
}
