var products = [{"id":101,"name":"Basket Ball","image":"basketball.png","price":150},{"id":102,"name":"Football","image":"football.png","price":120},{"id":103,"name":"Soccer","image":"soccer.png","price":110},{"id":104,"name":"Table Tennis","image":"table-tennis.png","price":130},{"id":105,"name":"Tennis","image":"tennis.png","price":100}];
var add_to_cart = [];
var t;
$(document).ready(function(){
    // alert("ready");
    print_array_products();
    $('#main').on('click','.add-to-cart',add_product_to_cart);
    $('#res').on('click','#empty',function(){
        add_to_cart.length =0;
        print_add_product_to_cart();
    });
    $('#res').on('click','.delete',delete_cart);
    $('#res').on('click','#minus',function(){
        // alert("minus");
        var quantity = $(this).next().text();
        // alert(quantity);
        var product_id = $(this).closest('tr').children().eq(0).text();
        find_count(product_id);
        if(quantity>1)
        add_to_cart[t].quantity -= 1; 
        print_add_product_to_cart();
    });
    $('#res').on('click','#plus',function(){
        // var quantity = $(this).next().text();
        // alert(quantity);
        var product_id = $(this).closest('tr').children().eq(0).text();
        find_count(product_id);
        add_to_cart[t].quantity += 1; 
        print_add_product_to_cart();
    })
});

function delete_cart(){
    var delete_id = $(this).closest('tr').children().eq(0).text();
    find_count(delete_id);
    add_to_cart.splice(t,1);
    print_add_product_to_cart();
}

function add_product_to_cart(){
    // alert("added to cart");
    var cart_element = $(this).parent().attr('id');
    // alert(cart_element);
    var product_id = "";
    for(var i=8;i<cart_element.length;i++){
        product_id += cart_element[i];
    }
    // alert(product_id);
    var product_array_index = find_index(product_id);
    var count = find_count(product_id);
    if(count)
        // cart_array_element ={id:products[product_array_index].id,
        //                     name:products[product_array_index].name,
        //                     image:products[product_array_index].image,
        //                     price:products[product_array_index].price,
        //                     quantity: add_to_cart[t].quantity+1
        //                     }
        add_to_cart[t].quantity += 1;
    else{
        var cart_array_element ={id:products[product_array_index].id,
            name:products[product_array_index].name,
            image:products[product_array_index].image,
            price:products[product_array_index].price,
            quantity:1
            }
        add_to_cart.push(cart_array_element);

    }

    print_add_product_to_cart();
    // console.table(cart_array_element);
    //  console.table(add_to_cart);

}

function print_add_product_to_cart(){
    var cart_text = '<table>';
    cart_text += '<tr>';
    cart_text += '<th>Product Id</th>';
    cart_text += '<th>Name</th>';
    cart_text += '<th>Price</th>';
    cart_text += '<th>Image</th>';
    cart_text += '<th>Quantity</th>';
    cart_text += '<th>Action</th>';
    cart_text += '</tr>';

    for(var i=0;i<add_to_cart.length;i++){
        cart_text += '<tr>';
        cart_text += '<td>'+add_to_cart[i].id+'</td>';
        cart_text += '<td>'+add_to_cart[i].name+'</td>';
        cart_text += '<td>$'+add_to_cart[i].price+'</td>';
        cart_text += '<td><img src="images/'+add_to_cart[i].image+'"></td>';
        cart_text += '<td><button id="minus">-</button><b>'+add_to_cart[i].quantity+'</b><button id="plus">+</button></td>';
        cart_text += '<td><a href="#res" class="delete">Delete</a></td>';
        cart_text += '</tr>';
    }
    cart_text += '</table>';
    cart_text += '<br>';
    cart_text += '<input type= "button" value="Empty Cart" id= "empty">';
    $('#res').html(cart_text);
}

function find_count(value1){
    for(var j =0;j< add_to_cart.length;j++){
        if(add_to_cart[j].id==value1){
        t = j;
        return 1;
        }
    }
    return 0;
}

function find_index(value){
    for(var i=0;i<products.length;i++){
        if(products[i].id==value)
        return i;
    }
}

function print_array_products(){
    var text = '<div id = products>'
    for(var i = 0; i < products.length; i++){

    text += '<div id="product-'+products[i].id+'" class="product">';
	text += '<img src="images/'+products[i].image+'">';
	text += '<h3 class="title"><a href="#">'+products[i].name+'</a></h3>';
	text +=	'<span>Price: $'+products[i].price+'</span>';
	text += '<a class="add-to-cart" href="#res">Add To Cart</a>'
	text += '</div>';

    }

    text += '</div>';

    $('#main').html(text);
}