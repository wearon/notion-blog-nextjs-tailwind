export interface Post {
    object: string
    id: string
    created_time: string
    last_edited_time: string
    created_by: CreatedBy
    last_edited_by: LastEditedBy
    cover: any
    icon: any
    parent: Parent
    archived: boolean
    properties: Properties
    url: string
    public_url: string
    slug: string
    updatedAt: string
  }
  
  export interface CreatedBy {
    object: string
    id: string
  }
  
  export interface LastEditedBy {
    object: string
    id: string
  }
  
  export interface Parent {
    type: string
    database_id: string
  }
  
  export interface Properties {
    'Last Updated': LastUpdated
    Public: Public
    Featured: Featured
    Tags: Tags
    Slug: Slug
    Published: Published
    Tweet: Tweet
    Created: Created
    Author: Author
    Description: Description
    Name: Name
    tags: any[]
  }
  
  export interface LastUpdated {
    id: string
    type: string
    last_edited_time: string
  }
  
  export interface Public {
    id: string
    type: string
    checkbox: boolean
  }
  
  export interface Featured {
    id: string
    type: string
    checkbox: boolean
  }
  
  export interface Tags {
    id: string
    type: string
    multi_select: any[]
  }
  
  export interface Slug {
    id: string
    type: string
    rich_text: any[]
  }
  
  export interface Published {
    id: string
    type: string
    date: any
  }
  
  export interface Tweet {
    id: string
    type: string
    rich_text: any[]
  }
  
  export interface Created {
    id: string
    type: string
    created_time: string
  }
  
  export interface Author {
    id: string
    type: string
    rich_text: any[]
  }
  
  export interface Description {
    id: string
    type: string
    rich_text: any[]
  }
  
  export interface Name {
    id: string
    type: string
    title: any[]
  }