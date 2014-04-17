get '/' do
  erb :index
end

get '/groceries' do
  content_type:json
  {groceries: [{name: "chicken", category: "meat"}, {name: "pork", category: "meat"}, {name: "beef", category: "meat"}]}.to_json
end
