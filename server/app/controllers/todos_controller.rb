class TodosController < ApplicationController

  def index
    @todos = Todo.all
    render json: @todos
  end

  def show
    @todo = Todo.find(params[:id])
    render json: @todo
  end

  def create
    @todo = Todo.new(todo_params)

    if @todo.save
      render json: @todo, status: :created
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  def update
    @todo = Todo.find(params[:id])

    if @todo.update(todo_params)
      render nothing: true, status: 204
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  protected

  def todo_params
    params.require(:todo).permit(:name, :priority)
  end

end
