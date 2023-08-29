import { createClient } from '@supabase/supabase-js'
//Supabase client for interacting with the database
const supabase = createClient(process.env.SUPABASE_API_URL, process.env.SUPABASE_API_KEY)

const insert_row_in_paris_pollution_table = async (row) => {

    const formattedDateTime = new Date(row.ts).getTime()
    const {data: existing, error: err} = await supabase
     .from('paris_pollution')
     .select()
     .eq('ts', formattedDateTime)

     if(existing.length>0){
        console.log(`-------------Reading at timestamp ${row.ts} already exists skipping-------------\n`)
        return
     }

    const { data, error } = await supabase
    .from('paris_pollution')
    .insert([{...row, ts: formattedDateTime}])
    .select()

    if(error){
        console.log(error)
    }

    console.log('-------------INSERTED-------------\n')
    console.log(data)
    console.log('-------------INSERTED-------------\n')
    return
}
const get_highest_aqius_reading_paris = async () => {
    const {data: list, error: err} = await supabase
    .from('paris_pollution')
    .select()
    .order('aqius', {ascending: false})
    .limit(1)

    if(list.length>0){
        return new Date(list[0].ts).toISOString()
    }
}
export {insert_row_in_paris_pollution_table, get_highest_aqius_reading_paris}