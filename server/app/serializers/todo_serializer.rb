class TodoSerializer < ActiveModel::Serializer
  attributes :id, :name, :priority
end
